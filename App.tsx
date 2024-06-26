import React, { useCallback, useEffect, useState } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import Purchases, {
  LOG_LEVEL,
  PurchasesOffering,
  PurchasesPackage,
} from "react-native-purchases";

const APIKeys = {
  apple: "your_revenuecat_apple_api_key",
  google: "your_revenuecat_google_api_key",
};

export default function App() {
  const [currentOffering, setCurrentOffering] =
    useState<PurchasesOffering | null>(null);

  useEffect(() => {
    const setup = async () => {
      if (Platform.OS == "android") {
        await Purchases.configure({ apiKey: APIKeys.google });
      } else {
        await Purchases.configure({ apiKey: APIKeys.apple });
      }

      const offerings = await Purchases.getOfferings();
      setCurrentOffering(offerings.current);
    };

    Purchases.setLogLevel(LOG_LEVEL.DEBUG);

    setup().catch(console.log);
  }, []);

  const purchaseItem = useCallback(async (purPackage: PurchasesPackage) => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(purPackage);
      if (
        typeof customerInfo.entitlements.active["my_entitlement_identifier"] !==
        "undefined"
      ) {
        // Unlock that great "pro" content
      }
    } catch (e: any) {
      if (!e.userCancelled) {
        Alert.alert("Error", e.message);
      }
    }
  }, []);

  if (!currentOffering) {
    return "Loading...";
  } else {
    return (
      <View style={styles.container}>
        <Text>Current Offering: {currentOffering.identifier}</Text>
        <Text style={{ marginTop: 10 }}>
          Package Count: {currentOffering.availablePackages.length}
        </Text>
        <View style={{ marginTop: 10 }}>
          {currentOffering.availablePackages.map((pkg) => {
            return (
              <TouchableOpacity
                key={pkg.product.identifier}
                onPress={() => purchaseItem(pkg)}
              >
                <Text style={{ marginTop: 10 }}>{pkg.product.identifier}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
