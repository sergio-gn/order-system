import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: { color: 'black', textAlign: 'center', margin: 30 }
});

const PDFDocument = ({ cartItems, qtd }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Pedido</Text>
        {cartItems.map((product) => (
          <View key={product.id} style={styles.product}>
            <Text>Nome: {product.name}</Text>
            <Text>Quantidade: {qtd}</Text>
            <Text>Preço: {product.promoprice ? product.promoprice : product.price}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFDocument;