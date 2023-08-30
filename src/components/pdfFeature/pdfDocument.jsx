import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 30,
  },
  section: {
    color: 'black',
    textAlign: 'center',
    margin: 30,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: 'black',
    backgroundColor: '#f2f2f2',
  },
  tableCell: {
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 5,
    flexGrow: 1,
  },
  tableHeaderCell: {
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 5,
    flexGrow: 1,
    fontWeight: 'bold',
  },
  productNameCell: {
    flexBasis: '50%', // Adjust based on your preference
    paddingRight: 10, // Add some spacing between columns
  },
  quantityCell: {
    flexBasis: '15%', // Adjust based on your preference
    paddingRight: 10,
  },
  priceCell: {
    flexBasis: '15%', // Adjust based on your preference
    paddingRight: 10,
  },
  totalCell: {
    flexBasis: '35%', // Adjust based on your preference
  },
});

const PDFDocument = ({ groupedCartItems, totalPrice, calculateTotal }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Pedido</Text>
        <View style={styles.table}>
          {/* Header row */}
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeaderCell, styles.productNameCell]}>Produto</Text>
            <Text style={[styles.tableHeaderCell, styles.quantityCell]}>Quantidade</Text>
            <Text style={[styles.tableHeaderCell, styles.priceCell]}>Preço</Text>
            <Text style={[styles.tableHeaderCell, styles.totalCell]}>Total</Text>
          </View>

          {/* Data rows */}
          {groupedCartItems.map((product) => (
            <View key={product.id} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.productNameCell]}>{product.name}</Text>
              <Text style={[styles.tableCell, styles.quantityCell]}>{product.quantity}</Text>
              <Text style={[styles.tableCell, styles.priceCell]}>
                R$ {product.promoprice ? product.promoprice : product.price}
              </Text>
              <Text style={[styles.tableCell, styles.totalCell]}>
                R$ {product.promoprice ? product.promoprice * product.quantity : product.price * product.quantity}
              </Text>
            </View>
          ))}

          {/* Totals row */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.productNameCell]}>Total</Text>
            <Text style={[styles.tableCell, styles.quantityCell]}></Text>
            <Text style={[styles.tableCell, styles.priceCell]}></Text>
            <Text style={[styles.tableCell, styles.totalCell]}>R$ {calculateTotal}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;