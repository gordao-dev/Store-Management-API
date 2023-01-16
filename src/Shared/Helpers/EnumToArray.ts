import IObject from "@Shared/@Types/IObject";

class EnumToArray {
  public execute = (enumme: IObject): string[] => {
    return Object.values(enumme)
      .filter((value) => typeof value === "string")
      .map((value) => value as string);
  };
}

export default EnumToArray;
