import { JSDOM } from 'jsdom';

type Schedule = {
  day: String;
  start: Number;
  end: Number;
  isOnline: Boolean;
};

type Class = {
  code: Number;
  course: String;
  section: String;
  professor?: String;
  schedules: Schedule[];
  enrolled: Number;
  enrollCap: Number;
  room: String;
  remarks: String;
};

// TODO: Make parser for each type of row
// - Schedule Row
// - Professor Row
// - Class Row

const appendSchedule = (data: String[]) => {
  const schedule: Schedule = {
    day: data[3],
    start: Number(data[4].trim().slice(0, 4)),
    end: Number(data[4].trim().slice(-4)),
    isOnline: Boolean(data[5].trim()),
  };

  return schedule;
};

const createClass = (data: String[]) => {
  const newClass: Class = {
    code: Number(data[0]),
    course: data[1],
    section: data[2],
    room: data[5],
    enrollCap: Number(data[6]),
    enrolled: Number(data[7]),
    remarks: data[8],
    schedules: [],
  };

  // A class will always have at least one schedule
  newClass.schedules.push(appendSchedule(data));

  return newClass;
};

const parseRows = (rowArray: HTMLTableRowElement[]) => {
  let classes: Class[] = [];
  let i = 0;

  // Start at -1 because 0 means there's 1 class
  let j = -1;

  const getRowCellsData = (row: HTMLTableRowElement) => {
    const cells = Array.from(row.cells);
    const data = cells.map((cell) => {
      return cell.textContent?.trim() ?? '';
    });

    return data;
  };

  while (i < rowArray.length) {
    // Get the data from each cell inside the row
    const data = getRowCellsData(rowArray[i]);

    // If there is only 1 data, then it's just the professor name.
    // We append it to the last class then go next.
    if (data.length === 1) {
      classes[j].professor = data[0];
      i += 1;
      continue;
      // This condition checks for a secondary schedule
    } else if (data[0] === '') {
      classes[j].schedules.push(appendSchedule(data));
      classes[j].room = classes[j].room || data[5];
      i += 1;
      continue;
    }

    // Create a new class from the data
    j += 1;
    const newClass = createClass(data);
    classes.push(newClass);
    i += 1;
  }

  console.log(classes[2].schedules);
  return classes;
};

const getTableRows = (html: string) => {
  // Parse the html text as a DOM element
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Query for the table of classes
  const table = doc.querySelector('td > form > table > tbody');

  // Query for the rows inside of the table
  const rows = table?.getElementsByTagName('tr');

  // Convert into array, remove the first row since it's
  // just headers
  const rowArray = Array.from(rows || []).slice(1);

  return rowArray;
};

export const getClasses = (html: string) => {
  const rows = getTableRows(html);

  const data = parseRows(rows);

  console.log(data);
  return data;
};
