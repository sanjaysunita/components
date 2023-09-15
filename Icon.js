import React                 from 'react'
import IconPlus              from '../assets/icons/plus.svg'
import IconLightening        from '../assets/icons/lightening.svg'
import IconActivity          from '../assets/icons/activity.svg'
import IconTimesCircle       from '../assets/icons/times-circle.svg'
import IconFire              from '../assets/icons/fire.svg'
import IconMedia             from '../assets/icons/media.svg'
import IconCheckCircle       from '../assets/icons/check-circle.svg'
import IconCamera            from '../assets/icons/camera.svg'
import IconArrowRight        from '../assets/icons/arrow-right.svg'
import IconArrowLeft         from '../assets/icons/arrow-left.svg'
import IconAvatar            from '../assets/icons/avatar.svg'
import IconCalendar          from '../assets/icons/calendar.svg'
import IconChair             from '../assets/icons/chair.svg'
import IconChevronRight      from '../assets/icons/chevron-right.svg'
import IconChange            from '../assets/icons/change.svg'
import IconChevronDown       from '../assets/icons/chevron-down.svg'
import IconTrash             from '../assets/icons/trash.svg'
import IconChevronUp         from '../assets/icons/chevron-up.svg'
import IconChat              from '../assets/icons/chat.svg'
import IconEdit              from '../assets/icons/edit.svg'
import IconCheck             from '../assets/icons/check.svg'
import IconClock             from '../assets/icons/clock.svg'
import IconClockFilled       from '../assets/icons/clock-filled.svg'
import IconDot               from '../assets/icons/dot.svg'
import IconQuestionCircle    from '../assets/icons/question-circle.svg'
import IconQuestion          from '../assets/icons/question.svg'
import IconExerciseHamstring from '../assets/icons/exercise-hamstring.svg'
import IconHelpChat          from '../assets/icons/help-chat.svg'
import IconHome              from '../assets/icons/home.svg'
import IconInfo              from '../assets/icons/info.svg'
import IconSurvey            from '../assets/icons/survey.svg'
import IconInfoCircle        from '../assets/icons/info-circle.svg'
import IconLock              from '../assets/icons/lock.svg'
import IconLowStool          from '../assets/icons/low-stool.svg'
import IconMilestones        from '../assets/icons/milestones.svg'
import IconMilestoneComplete from '../assets/icons/milestone-complete.svg'
import IconMilestoneSkipped  from '../assets/icons/milestone-skipped.svg'
import IconMilestonePending  from '../assets/icons/milestone-pending.svg'
import IconMat               from '../assets/icons/mat.svg'
import IconSend              from '../assets/icons/send.svg'
import IconMute              from '../assets/icons/mute.svg'
import IconPause             from '../assets/icons/pause.svg'
import IconPillow            from '../assets/icons/pillow.svg'
import IconPlan              from '../assets/icons/plan.svg'
import IconPlay              from '../assets/icons/play.svg'
import IconProgress          from '../assets/icons/progress.svg'
import IconResources         from '../assets/icons/resources.svg'
import IconSpeaker           from '../assets/icons/speaker.svg'
import IconTimes             from '../assets/icons/times.svg'
import IconTowel             from '../assets/icons/towel.svg'
import IconWellness          from '../assets/icons/wellness.svg'
import IconWalking           from '../assets/icons/walking.svg'

export default (
  {
    name,
    color,
    size = 24,
    style = {}
  }
) => {
  const Tag = {
    'arrow-right': IconArrowRight,
    'arrow-left': IconArrowLeft,
    'chevron-right': IconChevronRight,
    'chevron-down': IconChevronDown,
    'chevron-up': IconChevronUp,
    'exercise-hamstring': IconExerciseHamstring,
    'help-chat': IconHelpChat,
    'info-circle': IconInfoCircle,
    'low-stool': IconLowStool,
    activity: IconActivity,
    media: IconMedia,
    trash: IconTrash,
    avatar: IconAvatar,
    lightening: IconLightening,
    change: IconChange,
    calendar: IconCalendar,
    chair: IconChair,
    chat: IconChat,
    camera: IconCamera,
    edit: IconEdit,
    fire: IconFire,
    check: IconCheck,
    'check-circle': IconCheckCircle,
    plus: IconPlus,
    clock: IconClock,
    'clock-filled': IconClockFilled,
    dot: IconDot,
    home: IconHome,
    send: IconSend,
    info: IconInfo,
    lock: IconLock,
    question: IconQuestion,
    'question-circle': IconQuestionCircle,
    milestones: IconMilestones,
    'milestone-complete': IconMilestoneComplete,
    'milestone-skipped': IconMilestoneSkipped,
    'milestone-pending': IconMilestonePending,
    mat: IconMat,
    'times-circle': IconTimesCircle,
    mute: IconMute,
    pause: IconPause,
    pillow: IconPillow,
    plan: IconPlan,
    play: IconPlay,
    progress: IconProgress,
    resources: IconResources,
    speaker: IconSpeaker,
    survey: IconSurvey,
    times: IconTimes,
    towel: IconTowel,
    wellness: IconWellness,
    walking: IconWalking,
  }[name]
  return (
    <Tag
      style={style}
      fill={color}
      stroke={color}
      color={color}
      width={style.width || size}
      height={style.height || size}
    />
  )
}
