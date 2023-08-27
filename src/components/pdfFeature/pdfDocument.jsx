import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', paddingTop: 30, paddingLeft: 60, paddingRight: 60, paddingBottom: 30 },
  section: { color: 'black', textAlign: 'center', margin: 30 },
  table: { display: 'table', width: '100%', borderStyle: 'solid', borderWidth: 1, borderColor: 'black' },
  tableRow: { flexDirection: 'row' },
  tableCell: { margin: 5, padding: 5, flexGrow: 1, borderColor: 'black', borderWidth: 1 },
});

const PDFDocument = ({ cartItems, qtd }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Pedido</Text>
        <View style={styles.table}>
          {cartItems.map((product) => (
            <View key={product.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{product.name}</Text>
              <Text style={styles.tableCell}>{qtd}</Text>
              <Text style={styles.tableCell}>{product.promoprice ? product.promoprice : product.price}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
