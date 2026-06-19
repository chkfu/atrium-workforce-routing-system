import { LargeNumberLike } from "node:crypto";

//  remarks: normal text
export const format_text = (str: any): string | null => {
  if (!str) return null;
  return String(str).trim().replace(/\s+/g, ' ').toLowerCase();
};

//  remarks: email address
export const format_email = (str: any): string | null => {
  if (!str) return null;
  return String(str).trim().toLowerCase().replace(/\s/g, '');
};

//  remarks: enum matching
export const format_enum = (str: any, valid_enums: string[]): string | null => {
  if (!str) return null;
  const formatted = String(str).trim().toLowerCase();
  return valid_enums.includes(formatted) ? formatted : null;
};

//  remarks: number matching

export const format_number = (str: any, limit?: number, type: string = 'integer'): number | null => {
  if (!str && str !== 0) return null;
  const match = String(str).match(/^-?\d+(?:\.\d+)?$/);
  //  remarks: error handling
  if (!match) return null;
  let num = parseFloat(match[0]);
  if (limit !== undefined && num > limit) return null;
  //  remarks: rounding number
  if (type === 'integer') num = Math.floor(num);
  else num = parseFloat(num.toFixed(2));
  return num;
}

//  remarks: boolean matching
export const format_boolean = (str: any): boolean | null => {
  if (!str) return null;
  const formatted = String(str).trim().toLowerCase();
  if (formatted === 'true') return true;
  if (formatted === 'false') return false;
  return null;
};

//  remarks: date matching
export const format_date = (str: any): string | null => {
  if (!str) return null;
  const trimmed = String(str).trim();
  const date_regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!date_regex.test(trimmed)) return null;
  const date = new Date(trimmed);
  return isNaN(date.getTime()) ? null : trimmed;
};
