import TextRecognition from '@react-native-ml-kit/text-recognition';

export interface ScannedMeasurement {
  systolic: string | null;
  diastolic: string | null;
  pulse: string | null;
}
export const parseMeasurementText = (text: string): ScannedMeasurement => {
  console.log("📝 Surowy tekst z OCR:", text);

  let cleanedText = text.toUpperCase();
  cleanedText = cleanedText
    .replace(/[OcDQ]/g, '0') 
    .replace(/[Il|/!]/g, '1')
    .replace(/[Zz]/g, '2')
    .replace(/[Ss]/g, '5')
    .replace(/[Gg]/g, '6') 
    .replace(/[B8]/g, '8')  
    .replace(/[Aa]/g, '4')
    .replace(/[^0-9]/g, ' '); 

  console.log("🧹 Tekst (tylko cyfry):", cleanedText);
  const foundNumbersMatches = cleanedText.match(/\b\d{2,3}\b/g);

  let systolic: string | null = null;
  let diastolic: string | null = null;
  let pulse: string | null = null;

  if (foundNumbersMatches) {
    let numbers = foundNumbersMatches.map(n => parseInt(n, 10));
    numbers = numbers.filter(n => n > 35 && n < 300);
    
    numbers = Array.from(new Set(numbers));

    numbers.sort((a, b) => b - a);
    
    console.log("🔢 Kandydaci po filtrowaniu (posortowani):", numbers);

    if (numbers.length >= 2) {
      const maxVal = numbers[0];
      const secondVal = numbers[1];

      if (maxVal > secondVal) {
        systolic = maxVal.toString();
        diastolic = secondVal.toString();

        if (numbers.length >= 3) {
           pulse = numbers[2].toString();
        }
      }
    }
  }

  return { systolic, diastolic, pulse };
};

export const scanMeasurementFromImage = async (imageUri: string): Promise<ScannedMeasurement> => {
  try {
    console.log("📸 Rozpoczynam skanowanie zdjęcia:", imageUri);
    const result = await TextRecognition.recognize(imageUri);
    
    return parseMeasurementText(result.text);

  } catch (error) {
    console.error("❌ Błąd krytyczny OCR:", error);
    return { systolic: null, diastolic: null, pulse: null };
  }
};