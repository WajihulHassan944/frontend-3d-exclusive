import { countryToCurrency } from "./countryToCurrency";
import { baseUrl } from "@/const";

export const getLocalizedAmount = async (credits) => {
  try {
    // 1️⃣ Detect user's country
    const res = await fetch("https://ipwho.is/");
    const data = await res.json();

    // Default fallback
    let currency = "EUR";
    if (data.success && data.country_code) {
      currency = countryToCurrency[data.country_code]?.code || "EUR";
    }

    // 2️⃣ Fetch localized prices from backend
    const priceRes = await fetch(`${baseUrl}/products/by-currency?currency=${currency}`);
    const priceData = await priceRes.json();

    if (!priceData.success || !Array.isArray(priceData.products)) {
      console.warn("⚠️ Could not fetch localized prices, falling back to EUR.");
      return 0;
    }

    // 3️⃣ Find product matching the given credits
    const product = priceData.products.find((p) => p.credits === credits);

    // 4️⃣ Determine the final price
    const amount = product?.localizedPricing?.[0]?.price || product?.priceEUR || 0;

    return Math.round(amount);
  } catch (err) {
    console.error("❌ Failed to get localized amount:", err);
    return 0;
  }
};
