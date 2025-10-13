// components/PDFDocument.tsx
'use client';

import OrderPreviewLoading from '@/app/[locale]/(dashboard)/dashboard/orders/view/[orderId]/preview/loading';
import { cn, formatNumber, getDateLibPromise } from '@/lib/utils';
import { OrderRow } from '@/types/tables';
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { use, useEffect, useState } from 'react';

// PDFViewer needs to be dynamically imported (client-side only)
const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <OrderPreviewLoading hasHeader={false} />,
  },
);

Font.register({
  family: 'vazirmatn',
  src: `https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/ttf/Vazirmatn-Regular.ttf`,
  fontStyle: 'normal',
  fontWeight: 400,
});

// Unicode bidirectional control characters
const RLE = '\u202B'; // RIGHT-TO-LEFT EMBEDDING
const PDF = '\u202C'; // POP DIRECTIONAL FORMATTING

// Helper function to wrap text in RTL control characters
const rtlText = (text: string) => `${RLE}${text}${PDF}`;

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff', // --background
    padding: 30,
    fontFamily: 'vazirmatn',
  },
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: '1 solid #ebebeb', // --border
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    color: '#252525', // --foreground
  },
  orderNumber: {
    fontSize: 12,
    textAlign: 'center',
    color: '#8e8e8e', // --muted-foreground
  },
  infoSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8', // --muted
    borderRadius: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    fontSize: 12,
  },
  infoRowRtl: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 8,
    fontSize: 12,
  },
  label: {
    fontWeight: 700,
    color: '#252525', // --foreground
  },
  value: {
    color: '#8e8e8e', // --muted-foreground
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#343434', // --primary
    padding: 10,
    marginBottom: 5,
  },
  tableHeaderRtl: {
    flexDirection: 'row-reverse',
    backgroundColor: '#343434', // --primary
    padding: 10,
    marginBottom: 5,
  },
  tableHeaderText: {
    color: '#fbfbfb', // --primary-foreground
    fontSize: 12,
    fontWeight: 700,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottom: '1 solid #ebebeb', // --border
  },
  tableRowRtl: {
    flexDirection: 'row-reverse',
    padding: 10,
    borderBottom: '1 solid #ebebeb', // --border
  },
  tableCell: {
    fontSize: 11,
    color: '#252525', // --foreground
  },
  col1: {
    width: '10%',
    textAlign: 'center',
  },
  col2: {
    width: '40%',
    textAlign: 'left',
  },
  col2Rtl: {
    width: '40%',
    textAlign: 'right',
  },
  col3: {
    width: '20%',
    textAlign: 'center',
  },
  col4: {
    width: '30%',
    textAlign: 'right',
  },
  col4Rtl: {
    width: '30%',
    textAlign: 'left',
  },
  totalSection: {
    marginTop: 20,
    paddingTop: 15,
    borderTop: '2 solid #ebebeb', // --border
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalRowRtl: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 700,
    color: '#252525', // --foreground
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 700,
    color: '#252525', // --foreground
  },
  notesSection: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#f8f8f8', // --muted
    borderRadius: 5,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 5,
    color: '#252525', // --foreground
  },
  notesText: {
    fontSize: 11,
    color: '#8e8e8e', // --muted-foreground
    textAlign: 'left',
  },
  notesTextRtl: {
    fontSize: 11,
    color: '#8e8e8e', // --muted-foreground
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#8e8e8e', // --muted-foreground
    borderTop: '1 solid #ebebeb', // --border
    paddingTop: 10,
  },
});

type OrderItemDocumentProps = {
  order: OrderRow;
};

function OrderItemDocument({ order }: OrderItemDocumentProps) {
  const [isMount, setIsMount] = useState<boolean>(false);

  const t = useTranslations('pdf');

  const locale = useLocale();
  const isRtl = locale === 'fa';

  const dateFormat = use(getDateLibPromise(locale));

  useEffect(function () {
    setIsMount(true);
  }, []);

  // Wrap text in RTL control characters if needed
  const wrapText = (text: string) => (isRtl ? rtlText(text) : text);
  const formatPrice = (price: number) =>
    wrapText(
      `${formatNumber({
        locale: locale,
        number: price,
        options: {
          style: isRtl ? 'decimal' : 'currency',
          ...(!isRtl && { currency: 'USD' }),
        },
      })} ${isRtl ? t('currency') : ''}`,
    );

  return (
    <div className={cn('h-dvh w-full', isMount && 'p-4')}>
      <PDFViewer width='100%' height='100%'>
        <Document>
          <Page size='A4' style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>{wrapText(t('title'))}</Text>
              <Text style={styles.orderNumber}>
                {wrapText(`${t('orderNumber')} ${order.id.slice(0, 8)}`)}
              </Text>
            </View>

            {/* Order Info */}
            <View style={styles.infoSection}>
              <View style={isRtl ? styles.infoRowRtl : styles.infoRow}>
                <Text style={styles.label}>{wrapText(t('date'))}</Text>
                <Text style={styles.value}>
                  {wrapText(
                    dateFormat.formatDate(
                      order.created_at,
                      'dd MMM yyyy, HH:mm',
                    ),
                  )}
                </Text>
              </View>

              {order.customer_name && (
                <View style={isRtl ? styles.infoRowRtl : styles.infoRow}>
                  <Text style={styles.label}>
                    {wrapText(t('customerName'))}
                  </Text>
                  <Text style={styles.value}>
                    {wrapText(order.customer_name)}
                  </Text>
                </View>
              )}

              {order.customer_contact && (
                <View style={isRtl ? styles.infoRowRtl : styles.infoRow}>
                  <Text style={styles.label}>{wrapText(t('contact'))}</Text>
                  <Text style={styles.value}>{order.customer_contact}</Text>
                </View>
              )}

              {order.order_name && (
                <View style={isRtl ? styles.infoRowRtl : styles.infoRow}>
                  <Text style={styles.label}>{wrapText(t('orderName'))}</Text>
                  <Text style={styles.value}>{wrapText(order.order_name)}</Text>
                </View>
              )}

              <View style={isRtl ? styles.infoRowRtl : styles.infoRow}>
                <Text style={styles.label}>{wrapText(t('orderType'))}</Text>
                <Text style={styles.value}>
                  {wrapText(order.is_togo ? t('takeaway') : t('dineIn'))}
                </Text>
              </View>

              <View style={isRtl ? styles.infoRowRtl : styles.infoRow}>
                <Text style={styles.label}>{wrapText(t('orderStatus'))}</Text>
                <Text style={styles.value}>
                  {wrapText(t(`status.${order.status}`))}
                </Text>
              </View>
            </View>

            {/* Items Table */}
            <View>
              <View style={isRtl ? styles.tableHeaderRtl : styles.tableHeader}>
                <Text style={[styles.tableHeaderText, styles.col1]}>#</Text>
                <Text
                  style={[
                    styles.tableHeaderText,
                    isRtl ? styles.col2Rtl : styles.col2,
                  ]}
                >
                  {wrapText(t('productName'))}
                </Text>
                <Text style={[styles.tableHeaderText, styles.col3]}>
                  {wrapText(t('quantity'))}
                </Text>
                <Text
                  style={[
                    styles.tableHeaderText,
                    isRtl ? styles.col4Rtl : styles.col4,
                  ]}
                >
                  {wrapText(`${t('price')} (${t('currency')})`)}
                </Text>
              </View>

              {order.items.map((item, index) => (
                <View
                  key={item.id}
                  style={isRtl ? styles.tableRowRtl : styles.tableRow}
                >
                  <Text style={[styles.tableCell, styles.col1]}>
                    {index + 1}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      isRtl ? styles.col2Rtl : styles.col2,
                    ]}
                  >
                    {wrapText(item.name)}
                  </Text>
                  <Text style={[styles.tableCell, styles.col3]}>
                    {item.quantity}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      isRtl ? styles.col4Rtl : styles.col4,
                    ]}
                  >
                    {formatPrice(item.price * item.quantity)}
                  </Text>
                </View>
              ))}
            </View>

            {/* Total Section */}
            <View style={styles.totalSection}>
              <View style={isRtl ? styles.totalRowRtl : styles.totalRow}>
                <Text style={styles.totalLabel}>{wrapText(t('total'))}</Text>
                <Text style={styles.totalValue}>
                  {formatPrice(order.total_price)}
                </Text>
              </View>
            </View>

            {/* Notes */}
            {order.notes && (
              <View style={styles.notesSection}>
                <Text style={styles.notesLabel}>{wrapText(t('notes'))}</Text>
                <Text style={isRtl ? styles.notesTextRtl : styles.notesText}>
                  {wrapText(order.notes)}
                </Text>
              </View>
            )}

            {/* Footer */}
            <Text style={styles.footer}>{wrapText(t('thankYou'))}</Text>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}

export default OrderItemDocument;
