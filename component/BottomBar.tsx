import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BottomBar = ({ onOpenContentsModal, onToggleKeepAwake }: {
  onOpenContentsModal: () => void;
  onToggleKeepAwake: () => void;
}) => {
  return (
    <View style={styles.container}>
      {/* 목차 버튼 */}
      <TouchableOpacity style={styles.button} onPress={onOpenContentsModal}>
        <Ionicons name="list" size={24} color="#333" />
        <Text style={styles.label}>목차</Text>
      </TouchableOpacity>

      {/* 화면 꺼짐 방지 버튼 */}
      <TouchableOpacity style={styles.button} onPress={onToggleKeepAwake}>
        <Ionicons name="lock-closed-outline" size={24} color="#333" />
        <Text style={styles.label}>잠금</Text>
      </TouchableOpacity>

      {/* 댓글 버튼 (기능 없음) */}
      <TouchableOpacity style={styles.button} disabled>
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#aaa" />
        <Text style={[styles.label, { color: '#aaa' }]}>댓글</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fefefe',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  button: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: '#333',
  },
});
