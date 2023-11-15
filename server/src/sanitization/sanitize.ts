import profanity from "profanity-hindi";

const sanitize = (txt: string) => {
  return txt;
};

const isClean = (txt: string): boolean => {
  if (txt.includes("\n")) return false; //blocks new lines

  const res = !profanity.isMessageDirty(txt);

  return res;
};

export default sanitize;
export { isClean };
