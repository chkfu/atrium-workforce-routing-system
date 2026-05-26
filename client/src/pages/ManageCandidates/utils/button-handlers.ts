export const handle_checkbox_status = (
  id: number,
  setSelectedCandidates: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  setSelectedCandidates((checklist) => {
    const selected = checklist.includes(id);
    if (selected) {
      return checklist.filter((item) => item !== id);
    } else {
      return [...checklist, id];
    }
  });
};

export const handle_checkbox_select_all = (
  event: React.ChangeEvent<HTMLInputElement>,
  candidates: any[],
  setSelectedCandidates: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  const isChecked = event.target.checked;
  if (isChecked && candidates && candidates.length > 0) {
    const id_list = candidates.map((candidate) => candidate._id as number);
    setSelectedCandidates(id_list);
  } else {
    setSelectedCandidates([]);
  }
};
