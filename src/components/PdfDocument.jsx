import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: { color: 'black', textAlign: 'center', margin: 30 }
});

const PDFDocument = ({ cartItems }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Pedido</Text>
        {cartItems.map((product) => (
          <View key={product.id} style={styles.product}>
            <Text>{product.name}</Text>
            <Text>{product.promoprice ? product.promoprice : product.price}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFDocument;