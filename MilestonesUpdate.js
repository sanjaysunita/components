import React                          from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {Text}                         from 'react-native-elements'
import {bindActionCreators}           from 'redux'
import {connect}                      from 'react-redux'
import moment                         from 'moment-timezone'
import Overlay                        from './Overlay'
import Button                         from './Button'
import ButtonListItem                 from './ButtonListItem'
import Icon                           from './Icon'
import IconButton                     from './IconButton'
import {updateMilestone}              from '../redux/actions/dashboard'
import {ScreenHeight}                 from '../helpers'
import {colors}                       from '../theme'

class MilestonesUpdate extends React.Component {
  state = {
    confirmMilestone: null,
    showingHelpText: false,
  }

  handleUpdateMilestone(status) {
    this.props.updateMilestone({
      id: this.state.confirmMilestone.id,
      state: {
        status,
      },
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      this.props.onSubmit({
        error: this.props.error,
      })
      this.setState({
        confirmMilestone: null,
      })
    }
  }

  render() {
    const {
            milestoneAssignments,
            onCancel,
          } = this.props

    let nextAllowed = true

    return (
      <Overlay
        height={ScreenHeight * .8}
        isVisible={this.props.isVisible}
        hasAction={false}
        overlayContainerStyle={styles.overlay}
        onClosePress={onCancel}
        onBackdropPress={onCancel}
      >
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text
                h1
                h1Style={styles.title}
              >
                Milestones
              </Text>

              <IconButton
                name={this.state.showingHelpText ? 'times' : 'question'}
                color="white"
                background={colors.primary}
                onPress={() => this.setState(prevState => ({
                  showingHelpText: !prevState.showingHelpText,
                }))}
              />
            </View>

            {this.state.showingHelpText && (
              <View style={styles.helpTextContainer}>
                <View style={styles.helpTextRow}>
                  <Text style={styles.helpText}>
                    Tap an unlocked milestone below to complete or skip it.
                  </Text>
                </View>

                <View style={styles.helpTextRow}>
                  <Text style={styles.helpText}>
                    Milestone not yet completed
                  </Text>
                  <Icon
                    name="dot"
                    color="#e4e4e4"
                  />
                </View>

                <View style={styles.helpTextRow}>
                  <Text style={styles.helpText}>
                    Milestone is completed
                  </Text>
                  <Icon
                    name="check-circle"
                    color={colors.primary}
                  />
                </View>

                <View style={styles.helpTextRow}>
                  <Text style={styles.helpText}>
                    Milestone has been skipped
                  </Text>
                  <Icon
                    name="times-circle"
                    color={colors.lightGray}
                  />
                </View>
              </View>
            )}

            {/* MILESTONES LIST */}
            {(this.state.confirmMilestone ? [this.state.confirmMilestone] : milestoneAssignments).map((milestoneAssignment, index) => {
              const allowed = nextAllowed
              nextAllowed   = ['complete', 'skipped'].includes(milestoneAssignment.status)

              const status = !allowed ? 'notAllowed' : milestoneAssignment.status

              const icons = {
                complete: {
                  name: 'check-circle',
                  color: colors.primary,
                },
                pending: {
                  name: 'dot',
                  color: '#e4e4e4',
                },
                skipped: {
                  name: 'times-circle',
                  color: colors.lightGray,
                },
                notAllowed: {
                  name: 'lock',
                  color: colors.primary,
                }
              }

              return (
                <ButtonListItem
                  key={milestoneAssignment.id}
                  icon={icons[status].name}
                  disabled={!allowed}
                  style={styles.milestoneButtonItem}
                  iconStyle={{color: icons[status].color}}
                  onPress={() => this.setState({
                    confirmMilestone: {
                      ...milestoneAssignment,
                      canMarkIncomplete: (milestoneAssignments[index + 1] || {status: null}).status === 'pending',
                    },
                  })}
                >
                  <Text style={styles.milestoneTitleText}>
                    {milestoneAssignment.milestone.name}
                  </Text>

                  {milestoneAssignment.status === 'complete' && (
                    <Text style={styles.milestoneDateText}>
                      {moment(milestoneAssignment.updated_at).format('MM/D')}
                    </Text>
                  )}
                </ButtonListItem>
              )
            })}

            {/* CONFIRM MILESTONE */}
            {this.state.confirmMilestone && (
              <View style={styles.confirmMilestoneContainer}>
                <Text
                  style={StyleSheet.flatten([
                    styles.helpText,
                    {marginBottom: 24},
                  ])}
                >
                  Tap an option below for this milestone.
                </Text>

                {this.state.confirmMilestone.status !== 'complete' && (
                  <Button
                    title="Mark Complete"
                    containerStyle={{marginBottom: 16}}
                    onPress={() => this.handleUpdateMilestone('complete')}
                  />
                )}
                {this.state.confirmMilestone.status !== 'skipped' && (
                  <Button
                    title="Mark as Skipped"
                    type="secondary"
                    containerStyle={{marginBottom: 16}}
                    onPress={() => this.handleUpdateMilestone('skipped')}
                  />
                )}
                {['complete', 'skipped'].includes(this.state.confirmMilestone.status) && (
                  <Button
                    title="Mark Incomplete"
                    type="secondary"
                    disabled={!this.state.confirmMilestone.canMarkIncomplete}
                    containerStyle={{marginBottom: 16}}
                    onPress={() => this.handleUpdateMilestone('pending')}
                  />
                )}
                <Button
                  title="Cancel"
                  type="clear"
                  onPress={() => this.setState({confirmMilestone: null})}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </Overlay>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    padding: 0,
    paddingBottom: 0,
  },
  container: {
    flex: 1,
    width: '100%',
    padding: 16,
  },
  title: {
    flex: 1,
    marginBottom: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  milestoneRow: {
    flexDirection: 'row',
  },
  milestoneButtonItem: {
    padding: 16,
  },
  milestoneTitleText: {
    marginBottom: 0,
  },
  milestoneDateText: {
    marginBottom: 0,
  },
  helpTextContainer: {
    marginBottom: 16,
  },
  helpTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginRight: 18,
  },
  helpText: {
    flex: 1,
    marginRight: 16,
    fontSize: 16,
    marginBottom: 0,
  },
  confirmMilestoneContainer: {
    paddingTop: 20,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e4e4e4',
  },
})

const mapStateToProps = ({user: userStore, dashboard: dashboardStore}) => ({
  // USER
  user: userStore.user,
  // MILESTONE
  milestoneResult: dashboardStore.updatingMilestoneResult,
  updating: dashboardStore.updatingMilestone,
  error: dashboardStore.updatingMilestoneError,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateMilestone,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(MilestonesUpdate)
