const dateFormat = (datetime: string | Date) => {
  const dateTime = new Date(datetime);

  const date = dateTime.toLocaleDateString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return date;
};

export default dateFormat;
