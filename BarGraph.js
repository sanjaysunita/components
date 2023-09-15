import React                                from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import Button                               from './Button'
import {ScreenWidth}                        from '../helpers'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.graph = React.createRef()
  }

  componentDidMount() {
    const {
            data,
            barGraphColumns = 9,
          } = this.props
    setTimeout(() => {
      this.graph.current.scrollTo({
        animated: false,
        x: (ScreenWidth / barGraphColumns) * ((data.length - barGraphColumns) / 2),
        y: 0,
      })
    }, 1)
  }

  render() {
    const {
            data,
            barGraphColumns = 9,
            datePeriod,
            onDatePeriodChange,
          } = this.props
    return (
      <View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Daily"
            buttonStyle={StyleSheet.flatten([
              styles.datePeriod,
              datePeriod === 'day' && styles.datePeriodSelected
            ])}
            titleStyle={StyleSheet.flatten([
              styles.datePeriodText,
              datePeriod === 'day' && styles.datePeriodSelectedText
            ])}
            onPress={() => onDatePeriodChange('day')}
          />
          <Button
            title="Weekly"
            buttonStyle={StyleSheet.flatten([
              styles.datePeriod,
              datePeriod === 'week' && styles.datePeriodSelected
            ])}
            titleStyle={StyleSheet.flatten([
              styles.datePeriodText,
              datePeriod === 'week' && styles.datePeriodSelectedText
            ])}
            onPress={() => onDatePeriodChange('week')}
          />
        </View>
        <ScrollView
          ref={this.graph}
          horizontal
          snapToInterval={ScreenWidth / barGraphColumns}
          showsHorizontalScrollIndicator={false}
        >
          {data.map(dataPoint => (
            <View
              key={dataPoint.id}
              style={{width: ScreenWidth / barGraphColumns}}
            >
              <View style={styles.dataPointBarContainer}>
                {!!dataPoint.valueText && (
                  <Text style={styles.dataPointValue}>
                    {dataPoint.valueText}
                  </Text>
                )}
                {dataPoint.value > 0 && (
                  <View
                    style={StyleSheet.flatten([
                      styles.dataPointBar,
                      {height: `${dataPoint.value}%`}
                    ])}
                  />
                )}
              </View>
              <Text style={styles.dataPointLabel}>
                {dataPoint.label}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  datePeriod: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    width: 96,
    backgroundColor: '#FDF0EF',
    marginRight: 16,
  },
  datePeriodText: {
    color: '#746E6E',
    fontSize: 16,
  },
  datePeriodSelected: {
    backgroundColor: '#EE7E7B',
  },
  datePeriodSelectedText: {
    color: '#ffffff',
  },
  dataPointBarContainer: {
    height: 200,
    justifyContent: 'flex-end',
    marginTop: 32, // accommodate for value text
  },
  dataPointBar: {
    width: 8,
    backgroundColor: '#EC716E',
    marginTop: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    // I think this looks bad... but if John tells us to add it back, well, here it is
    // shadowColor: '#EF7B77',
    // shadowOpacity: .32,
    // shadowRadius: 14,
    // shadowOffset: {
    //   height: 0,
    //   width: 0
    // },
  },
  dataPointValue: {
    textAlign: 'center',
    color: '#A7B1CC',
  },
  dataPointLabel: {
    marginTop: 6,
    textAlign: 'center',
    color: '#A7B1CC',
  },
})
