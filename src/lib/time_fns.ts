export function jDtoGreg(jdn: number): Date {
  let A: number;

  const Z = Math.trunc(jdn);

  const F = jdn - Z;

  if (Z < 2299161) {
    A = Z;
  } else {
    const alpha = Math.trunc((Z - 1867216.25) / 36524.25);
    A = Z + 1 + alpha - Math.trunc(alpha / 4);
  }

  const B = Math.trunc(A + 1524);

  const C = Math.trunc((B - 122.1) / 365.25);

  const D = Math.trunc(365.25 * C);

  const E = Math.trunc((B - D) / 30.6001);

  const day = B - D - Math.trunc(30.6001 * E) + F;

  let month: number;

  if (E < 0 || E > 15) {
    console.log("sec_jd2000_to_greg_meeus, unacceptable value of E");
  }

  if (E < 14) {
    month = E - 1;
  } else {
    month = E - 13;
  }

  let year: number;
  if (month > 2) {
    year = C - 4716;
  } else {
    year = C - 4715;
  }

  //get fraction part
  let fraction = day - Math.trunc(day);
  const hour = fraction * 24;

  fraction = hour - Math.trunc(hour);
  const minute = fraction * 60;

  fraction = minute - Math.trunc(minute);
  let second = fraction * 60;

  // Math.ceil подходит лучше всего
  second = Math.ceil(second);
  //second =   Math.round(second);
  //second =  (int)(second);

  return new Date(
    year,
    month - 1,
    Math.trunc(day),
    Math.trunc(hour),
    Math.trunc(minute),
    Math.trunc(second)
  );
}
