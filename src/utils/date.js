export function formatDateTime(value) {
  const rawValue = typeof value === 'string' ? value.trim() : value;

  if (!rawValue) {
    return 'Fonte RSS';
  }

  const dateOnlyMatch =
    typeof rawValue === 'string'
      ? rawValue.match(/^(\d{4})-(\d{2})-(\d{2})$/)
      : null;
  const date = dateOnlyMatch
    ? new Date(
        Number(dateOnlyMatch[1]),
        Number(dateOnlyMatch[2]) - 1,
        Number(dateOnlyMatch[3])
      )
    : new Date(rawValue);

  if (Number.isNaN(date.getTime())) {
    return 'Fonte RSS';
  }

  const dateText = date.toLocaleDateString('pt-BR');
  const hasTime =
    typeof rawValue === 'string' && /(?:T|\s)\d{1,2}:\d{2}/.test(rawValue);

  if (!hasTime) {
    return dateText;
  }

  const timeText = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });

  return `${dateText} às ${timeText}`;
}
