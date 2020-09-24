export function ordinal(d: number | string) {
  const districtNumber = typeof d === "number" ? d : parseInt(d, 10);
  if (districtNumber > 3 && districtNumber < 21) return "th";
  switch (districtNumber % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
