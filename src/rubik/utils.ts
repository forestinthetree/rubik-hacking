import { Peripheral } from "@abandonware/noble";

const RUBIK_LOCAL_NAME_PREFIX = "Rubiks_";

export const isRubik = (peripheral: Peripheral): boolean => {
  const {
    advertisement: { localName = "" },
  } = peripheral;

  return localName.startsWith(RUBIK_LOCAL_NAME_PREFIX);
};
