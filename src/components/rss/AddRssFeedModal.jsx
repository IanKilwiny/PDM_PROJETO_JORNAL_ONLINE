import { Ionicons } from '@expo/vector-icons';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export function AddRssFeedModal({
  visible,
  value,
  error,
  onChangeText,
  onClose,
  onSubmit,
}) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.backdrop}
      >
        <Pressable
          accessibilityLabel="Fechar janela"
          onPress={onClose}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.dialog}>
          <View style={styles.iconWrap}>
            <Ionicons name="logo-rss" size={24} color="#087F82" />
          </View>
          <Text style={styles.title}>Adicionar feed RSS</Text>
          <Text style={styles.description}>
            Cole o endereço do feed que você quer acompanhar.
          </Text>

          <Text style={styles.label}>Link do feed</Text>
          <View style={[styles.inputWrap, error && styles.inputError]}>
            <Ionicons name="link-outline" size={19} color="#94A3B8" />
            <TextInput
              accessibilityLabel="Link do feed RSS"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              onChangeText={onChangeText}
              onSubmitEditing={onSubmit}
              placeholder="https://exemplo.com/feed.xml"
              placeholderTextColor="#A0AEC0"
              returnKeyType="done"
              style={styles.input}
              value={value}
            />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              onPress={onClose}
              style={({ pressed }) => [
                styles.cancelButton,
                pressed && styles.cancelPressed,
              ]}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={onSubmit}
              style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.submitPressed,
              ]}
            >
              <Ionicons name="cloud-upload-outline" size={18} color="#FFFFFF" />
              <Text style={styles.submitText}>Fazer upload</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  dialog: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    maxWidth: 430,
    padding: 24,
    width: '100%',
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: '#E6F5F2',
    borderRadius: 20,
    height: 48,
    justifyContent: 'center',
    marginBottom: 15,
    width: 48,
  },
  title: {
    color: '#173B3D',
    fontSize: 21,
    fontWeight: '700',
  },
  description: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  label: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 22,
  },
  inputWrap: {
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderColor: '#DCE5EC',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 9,
    minHeight: 50,
    paddingHorizontal: 13,
  },
  inputError: {
    borderColor: '#DC2626',
  },
  input: {
    color: '#173B3D',
    flex: 1,
    fontSize: 14,
    minWidth: 0,
    paddingVertical: 12,
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 12,
    marginTop: 7,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
  },
  cancelButton: {
    alignItems: 'center',
    borderColor: '#DCE5EC',
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
  },
  cancelPressed: {
    backgroundColor: '#F1F5F9',
  },
  cancelText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: '#087F82',
    borderRadius: 12,
    flex: 1.35,
    flexDirection: 'row',
    gap: 7,
    justifyContent: 'center',
    minHeight: 48,
  },
  submitPressed: {
    backgroundColor: '#06696C',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
