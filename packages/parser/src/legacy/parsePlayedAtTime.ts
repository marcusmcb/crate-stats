export function parsePlayedAtTime(timeValue: string) {
  return (
    timeValue.split(':')[0] +
    ':' +
    timeValue.split(':')[1] +
    ' ' +
    timeValue.split(':')[2]!.split(' ')[1]
  );
}
