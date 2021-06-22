// A COPY OF THE APPS SCRIPT VERSION OF THIS CODE

/**
 * Return a formatted date with 1 prefix. E.g., 03/02/2021 will return 1210302.
 *
 * @param {Date} date the date to use.
 * @return The formatted date.
 * @customfunction
 */
function MG_FORMAT_DATE(date) {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = "" + d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return ["1", year.substr(2, 2), month, day].join("");
}

/**
 * Return the generated KeyValues code for Positive and Negative Values.
 *
 * @param {Date} date the date to use.
 * @param {Number} nValue the Positive Value.
 * @param {Number} pValue the Negative Value.
 * @return The KeyValues with Positive and Negative Values.
 * @customfunction
 */
function MG_NPVALUES(date, nValue, pValue) {
  const line1 = `KeyValues = Vector.Create();`;
  const line2 = `KeyValues.Push_Back( ${nValue} );`;
  const line3 = `KeyValues.Push_Back( ${pValue} );`;
  const line4 = `MyDates["${MG_FORMAT_DATE(date)}"] = KeyValues;`;
  const item = `${line1}\r${line2}\r${line3}\r${line4}\r\r`;

  return item;
}

/**
 * Return the generated KeyValues code for Diff or any values.
 *
 * @param {Date} date the date to use.
 * @param {Number} value the arbitrary value.
 * @return The KeyValues with only one Push_Back line.
 * @customfunction
 */
function MG_VALUES(date, value) {
  const line1 = `KeyValues = Vector.Create();`;
  const line2 = `KeyValues.Push_Back( ${value} );`;
  const line3 = `MyDates["${MG_FORMAT_DATE(date)}"] = KeyValues;`;
  const item = `${line1}\r${line2}\r${line3}\r\r`;

  return item;
}
