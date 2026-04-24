'use client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { scriptsMaster, type CollateralRow } from '@/lib/data';
import { Plus, Trash2 } from 'lucide-react';

interface CollateralStepProps {
  data: { collateralRows: CollateralRow[]; proposedLimit?: number };
  onChange: (field: string, value: CollateralRow[]) => void;
}

export const CollateralStep = ({ data, onChange }: CollateralStepProps) => {
  const [rows, setRows] = useState<CollateralRow[]>(data.collateralRows || []);

  useEffect(() => {
    setRows(data.collateralRows || []);
  }, [data.collateralRows]);

  const addRow = () => {
    const newRows = [
      ...rows,
      { id: crypto.randomUUID(), script: '', type: 'ordinary' as const, qty: 0, valPrice: 0, haircut: 30, mv: 0, ev: 0 },
    ];
    setRows(newRows);
    onChange('collateralRows', newRows);
  };

  const removeRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
    onChange('collateralRows', newRows);
  };

  const updateRow = (index: number, updates: Partial<CollateralRow>) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], ...updates };

    if (updates.script) {
      const scriptInfo = scriptsMaster[updates.script];
      if (scriptInfo) {
        newRows[index].type = scriptInfo.type;
        newRows[index].haircut = scriptInfo.haircut;
        newRows[index].valPrice = Math.min(scriptInfo.latestPrice, scriptInfo.avg120);
      }
    }

    newRows[index].mv = newRows[index].qty * newRows[index].valPrice;
    newRows[index].ev = newRows[index].mv * (1 - newRows[index].haircut / 100);
    setRows(newRows);
    onChange('collateralRows', newRows);
  };

  const totalMV = rows.reduce((sum, r) => sum + (r.mv || 0), 0);
  const totalEV = rows.reduce((sum, r) => sum + (r.ev || 0), 0);
  const proposedLimit = (data as any).proposedLimit || 0;
  const ltv = totalEV > 0 ? ((proposedLimit / totalEV) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 font-display">
            Pledged Securities
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Add NEPSE-listed securities as collateral. Valuation price = min(LTP, 120-day avg).
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={addRow}>
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add Script
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500 border-b border-slate-200">
            <tr>
              <th className="pb-2 font-medium pr-2">Script (NEPSE)</th>
              <th className="pb-2 font-medium pr-2">Type</th>
              <th className="pb-2 font-medium pr-2">Qty</th>
              <th className="pb-2 font-medium pr-2">Val. Price</th>
              <th className="pb-2 font-medium pr-2">Haircut</th>
              <th className="pb-2 font-medium pr-2">Market Value</th>
              <th className="pb-2 font-medium pr-2">Eligible (NPR)</th>
              <th className="pb-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.id} className="border-b border-slate-100">
                <td className="py-2 pr-2">
                  <Select
                    value={row.script}
                    onChange={(e) => updateRow(idx, { script: e.target.value })}
                    className="min-w-[140px]"
                  >
                    <option value="" disabled>Select</option>
                    {Object.keys(scriptsMaster).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </Select>
                </td>
                <td className="py-2 pr-2 text-xs text-slate-500 capitalize">{row.type.replace('_', ' ')}</td>
                <td className="py-2 pr-2">
                  <Input
                    type="number"
                    value={row.qty || ''}
                    onChange={(e) => updateRow(idx, { qty: Number(e.target.value) })}
                    className="w-20"
                    min={0}
                  />
                </td>
                <td className="py-2 pr-2 text-slate-700">{row.valPrice.toLocaleString()}</td>
                <td className="py-2 pr-2 text-slate-500">{row.haircut}%</td>
                <td className="py-2 pr-2 font-medium text-slate-700">
                  {row.mv ? `NPR ${row.mv.toLocaleString()}` : '—'}
                </td>
                <td className="py-2 pr-2 font-semibold text-accent-700">
                  {row.ev ? `NPR ${row.ev.toLocaleString()}` : '—'}
                </td>
                <td className="py-2">
                  <button
                    onClick={() => removeRow(idx)}
                    className="text-red-400 hover:text-red-600 p-1 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <div className="py-8 text-center text-slate-400 text-sm">
            No securities added yet. Click &quot;Add Script&quot; to begin.
          </div>
        )}
      </div>

      {/* Totals & LTV */}
      {rows.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div>
            <span className="text-xs text-slate-500">Total Market Value</span>
            <p className="text-lg font-bold text-slate-800">NPR {totalMV.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-xs text-slate-500">Total Eligible Value</span>
            <p className="text-lg font-bold text-accent-700">NPR {totalEV.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-xs text-slate-500">Loan-to-Value (LTV)</span>
            <p className={`text-lg font-bold ${ltv > 65 ? 'text-red-600' : ltv > 50 ? 'text-amber-600' : 'text-emerald-600'}`}>
              {ltv.toFixed(1)}%
            </p>
            {ltv > 65 && (
              <p className="text-xs text-red-500 mt-0.5">⚠ Exceeds NRB max LTV of 65%</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
