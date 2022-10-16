import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 384;
const guidelineBaseHeight = 774.0444444444445;
const guideScale = Math.sqrt(guidelineBaseWidth * guidelineBaseHeight)

const scale = Math.sqrt(width * height) / guideScale;
const horiPer = width / guidelineBaseWidth;
const vertiPer = height / guidelineBaseHeight;


export const vScale = (size: number) => horiPer * size;
export const hScale = (size: number) => vertiPer * size;
export const mScale = (size: number) => scale * size;
export const fontScale = (size: number) => scale * size * 1.00;