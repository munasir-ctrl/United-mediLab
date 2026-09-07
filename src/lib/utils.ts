import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | null | undefined, currency = 'INR'): string {
  if (amount === null || amount === undefined) return '';
  const symbol = currency === 'INR' ? '₹' : currency;
  return `${symbol}${amount.toLocaleString('en-IN')}`;
}

export function formatDate(date: string | null | undefined): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(date: string | null | undefined): string {
  if (!date) return '';
  return new Date(date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function timeAgo(date: string | null | undefined): string {
  if (!date) return '';
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr} hr ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  return formatDate(date);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

export function validatePdfFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ['application/pdf'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only PDF files are allowed.' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size must not exceed 10MB.' };
  }

  return { valid: true };
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only PNG, JPEG, and WebP images are allowed.' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Image size must not exceed 5MB.' };
  }

  return { valid: true };
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    basic: 'Basic',
    primary: 'Primary',
    master: 'Master',
    executive: 'Executive',
    pcod: 'PCOD',
    promotional: 'Promotional Offers',
    complete_body: 'Complete Body',
  };
  return labels[category] || category;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    basic: 'bg-primary-50 text-primary-700 ring-primary-200',
    primary: 'bg-teal-50 text-teal-700 ring-teal-200',
    master: 'bg-cyan-50 text-cyan-700 ring-cyan-200',
    executive: 'bg-navy-50 text-navy-700 ring-navy-200',
    pcod: 'bg-pink-50 text-pink-700 ring-pink-200',
    promotional: 'bg-amber-50 text-amber-700 ring-amber-200',
    complete_body: 'bg-violet-50 text-violet-700 ring-violet-200',
  };
  return colors[category] || 'bg-slate-50 text-slate-700 ring-slate-200';
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    new: 'bg-blue-50 text-blue-700 ring-blue-200',
    contacted: 'bg-amber-50 text-amber-700 ring-amber-200',
    confirmed: 'bg-teal-50 text-teal-700 ring-teal-200',
    completed: 'bg-success-50 text-success-700 ring-success-200',
    cancelled: 'bg-error-50 text-error-700 ring-error-200',
    active: 'bg-success-50 text-success-700 ring-success-200',
    archived: 'bg-slate-100 text-slate-600 ring-slate-200',
    deleted: 'bg-error-50 text-error-700 ring-error-200',
    read: 'bg-slate-100 text-slate-600 ring-slate-200',
    responded: 'bg-success-50 text-success-700 ring-success-200',
  };
  return colors[status] || 'bg-slate-50 text-slate-700 ring-slate-200';
}

export function getGenderLabel(gender: string | null | undefined): string {
  if (!gender || gender === 'any') return 'All';
  return gender.charAt(0).toUpperCase() + gender.slice(1);
}
