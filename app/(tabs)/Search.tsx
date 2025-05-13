// import { View, Text } from 'react-native'
// import React from 'react'

// export default function Cookbook() {
//   return (
//     <View>
//       <Text>Cookbook</Text>
//     </View>
//   )
// }

import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

export default function QrScan() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    Alert.alert("QR 코드 스캔 완료", `데이터: ${data}`);
    // 원하는 로직: 페이지 이동, 데이터 처리 등
  };

  if (hasPermission === null) {
    return <Text>카메라 권한 요청 중...</Text>;
  }
  if (hasPermission === false) {
    return <Text>카메라 접근이 거부되었습니다.</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"다시 스캔하기"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
