import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, FlatList, Alert, SafeAreaView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ShoppingItem {
  id: string;
  name: string;
  completed: boolean;
}

export default function ShoppingListScreen() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [inputText, setInputText] = useState('');
  
  // テーマカラーを取得
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const addItem = () => {
    if (inputText.trim()) {
      const newItem: ShoppingItem = {
        id: Date.now().toString(),
        name: inputText.trim(),
        completed: false,
      };
      setItems([...items, newItem]);
      setInputText('');
    }
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: string) => {
    Alert.alert(
      '商品を削除',
      '本当に削除しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: '削除', style: 'destructive', onPress: () => {
          setItems(items.filter(item => item.id !== id));
        }},
      ]
    );
  };

  const renderItem = ({ item }: { item: ShoppingItem }) => (
    <ThemedView style={[
      styles.itemContainer, 
      { 
        shadowColor: textColor,
        backgroundColor: backgroundColor === '#151718' ? '#1f2937' : 'rgba(255, 255, 255, 0.95)'
      }
    ]}>
      <TouchableOpacity 
        style={styles.itemContent}
        onPress={() => toggleItem(item.id)}
        activeOpacity={0.7}
      >
        <ThemedView style={[
          styles.checkbox, 
          { borderColor: item.completed ? tintColor : (backgroundColor === '#151718' ? '#4b5563' : '#ddd') },
          item.completed && { backgroundColor: tintColor }
        ]}>
          {item.completed && <ThemedText style={styles.checkmark}>✓</ThemedText>}
        </ThemedView>
        <ThemedText style={[
          styles.itemText, 
          { color: textColor },
          item.completed && styles.itemTextCompleted
        ]}>
          {item.name}
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => deleteItem(item.id)}
        activeOpacity={0.6}
      >
        <ThemedText style={styles.deleteButtonText}>🗑</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>🛒 買い物リスト</ThemedText>
          {items.length > 0 && (
            <ThemedText style={[styles.subtitle, { color: textColor }]}>
              {items.filter(item => !item.completed).length} / {items.length} 個
            </ThemedText>
          )}
        </ThemedView>
        
        <ThemedView style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input, 
              { 
                color: textColor, 
                borderColor: tintColor,
                backgroundColor: backgroundColor === '#151718' ? '#374151' : 'rgba(255, 255, 255, 0.9)'
              }
            ]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="商品名を入力してください..."
            placeholderTextColor={backgroundColor === '#151718' ? '#9ca3af' : '#999'}
            onSubmitEditing={addItem}
            returnKeyType="done"
          />
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: tintColor }]} 
            onPress={addItem}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.addButtonText}>＋</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
        
        {items.length === 0 && (
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyIcon}>📝</ThemedText>
            <ThemedText style={[styles.emptyText, { color: textColor }]}>
              買い物リストが空です
            </ThemedText>
            <ThemedText style={[styles.emptySubtext, { color: textColor }]}>
              上のフィールドに商品名を入力して追加してください
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 2.5,
    borderRadius: 14,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 17,
    flex: 1,
    fontWeight: '500',
    lineHeight: 22,
  },
  itemTextCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  deleteButton: {
    padding: 10,
    marginLeft: 12,
    borderRadius: 8,
  },
  deleteButtonText: {
    fontSize: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    opacity: 0.6,
    textAlign: 'center',
    lineHeight: 22,
  },
});
