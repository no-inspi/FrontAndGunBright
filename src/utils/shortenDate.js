import { YearPicker } from "@mui/lab";

function getDifferenceInWeeks(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60 * 24 * 7);
}

function getDifferenceInDays(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60 * 24);
}

function getDifferenceInHours(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60);
}

function getDifferenceInMinutes(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60);
}

function getDifferenceInSeconds(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / 1000;
}


export function shortenDate(date) {
  var YearMonthDay = date.split(' ')[0]
  var hourminutesecond = date.split(' ')[1]

  var dateTamp = date.split(' ')[0] + ' ' + date.split(' ')[1].split(':')[0] + ':' + date.split(' ')[1].split(':')[1];
  var dateTamp = new Date(YearMonthDay.split('-')[0], YearMonthDay.split('-')[1] - 1, YearMonthDay.split('-')[2], hourminutesecond.split(':')[0]-1, hourminutesecond.split(':')[1], hourminutesecond.split(':')[2].substring(0, 2))
  var datenow = new Date(Date.now())

  var diffweeks = Math.floor(getDifferenceInWeeks(dateTamp, datenow))
  var diffdays = Math.floor(getDifferenceInDays(dateTamp, datenow))
  var diffhours = Math.floor(getDifferenceInHours(dateTamp, datenow))
  var diffminutes = Math.floor(getDifferenceInMinutes(dateTamp, datenow))
  var diffsecond = Math.floor(getDifferenceInSeconds(dateTamp, datenow))
  var toReturn = ''

  if (diffsecond > 59) {
    if (diffminutes > 59) {
      if (diffhours > 23) {
        if (diffdays > 6) {
          toReturn = diffweeks + ' weeks ago'
        }
        else {
          toReturn = diffdays + ' days ago'
        }
      }
      else {
        toReturn = diffhours + ' hours ago'
      }
    }
    else {
      toReturn = diffminutes + ' minutes ago'
    }
  }
  else {
    toReturn = diffsecond + ' seconds ago'
  }

  return toReturn;
}

// export const shortenDate = (date) => date.split(' ')[0] + ' ' + date.split(' ')[1].split(':')[0] + ':' + date.split(' ')[1].split(':')[1];