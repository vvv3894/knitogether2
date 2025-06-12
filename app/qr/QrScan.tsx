import { Camera, CameraView } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

export default function QrScan() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
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
        <View style={{flex: 1}}>
        <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
            <Button title={"다시 스캔하기"} onPress={() => setScanned(false)} />
        )}
        </View>
    );
}