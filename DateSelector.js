import React                                                from 'react'
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native'
import moment                                               from 'moment-timezone'
import {getDatesRangeArray}                                 from '../utils/common'
import {ScreenWidth}                                        from '../helpers'
import {colors}                                             from '../theme'

const DateItem = (
  {
    date,
    today = false,
    selected = false,
    onSelectDate = () => null,
    style = {},
  }
) => {
  let containerStyles = {...styles.dateItem}
  if (today) containerStyles = {...containerStyles, ...styles.dateItemToday}

  let dateItemDateTextStyles = {...styles.dateItemDateText}
  let dateItemDayTextStyles  = {...styles.dateItemDayText}

  if (selected) {
    containerStyles        = {...containerStyles, ...styles.dateItemSelected}
    dateItemDateTextStyles = {...dateItemDateTextStyles, ...styles.dateItemTextSelected}
    dateItemDayTextStyles  = {...dateItemDayTextStyles, ...styles.dateItemTextSelected}
  }

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([containerStyles, style])}
      onPress={() => onSelectDate(date)}
    >
      <View>
        <Text style={dateItemDateTextStyles}>
          {date.date()}
        </Text>
      </View>
      <View>
        <Text style={dateItemDayTextStyles}>
          {date.format('ddd')}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

class DateSelector extends React.Component {
  state = {
    selected: this.props.selectedDate || moment(),
  }

  handleSelectDate(date) {
    this.setState({selected: date})
    this.props.onSelectDate(date)
  }

  render() {
    const today = moment()

    return (
      <FlatList
        horizontal
        snapToInterval={ScreenWidth / 5}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={2}
        keyExtractor={item => item.format('YYYY-MM-DD')}
        data={getDatesRangeArray({
          startDate: this.props.startDate,
          endDate: this.props.endDate,
        })}
        extraData={this.state.selected}
        renderItem={({item: date}) => (
          <DateItem
            key={date.toString()}
            date={date}
            today={date.isSame(today, 'day')}
            selected={date.isSame(this.state.selected, 'day')}
            onSelectDate={(date) => this.handleSelectDate(date)}
          />
        )}
        getItemLayout={(data, index) => (
          {length: (ScreenWidth / 5), offset: (ScreenWidth / 5) * index, index}
        )}
      />
    )
  }
}

DateSelector.defaultProps = {
  selectedDate: undefined,
  startDate: moment().subtract(4, 'days'),
  endDate: moment().add(4, 'days'),
  onSelectDate: () => null,
}

const styles = StyleSheet.create({
  dateItem: {
    width: (ScreenWidth / 5) - 24,
    marginHorizontal: 12,
    paddingVertical: 24,
    borderRadius: 100,
  },
  dateItemToday: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  dateItemSelected: {
    backgroundColor: colors.primary,
    color: 'white',
  },
  dateItemTextSelected: {
    color: 'white',
  },
  dateItemDateText: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  dateItemDayText: {
    color: colors.lightGray,
    textAlign: 'center',
  },
})

export default DateSelector
