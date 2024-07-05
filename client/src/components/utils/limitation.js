export const limit = () => {
  const dd = new Date().getDay();
  const store = JSON.parse(localStorage.getItem("store")) || {
    limit: 0,
    date: dd,
  };

  console.log({ store });
  if (dd === store.date && store.limit >= 10)
    return { action: false, updateday: store.date };
  if (dd === store.date && store.limit < 10) {
    localStorage.setItem(
      "store",
      JSON.stringify({ limit: store.limit + 1, date: dd })
    );
    return { action: true, updateday: store.date };
  } else if (dd !== store.date) {
    localStorage.setItem("store", JSON.stringify({ limit: 1, date: dd }));
    return { action: true, updateday: store.date };
  }
  return { action: false, updateday: store.date };
};
