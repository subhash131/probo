export function validateInput(...args: string[]): boolean {
  let isFieldMissing = false;
  args.forEach((field) => {
    if (!field) {
      isFieldMissing = true;
    }
  });
  return isFieldMissing;
}
