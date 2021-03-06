import QItem from './QItem.js'
import QItemMain from './QItemMain.js'
import QItemSide from './QItemSide.js'
import LabelMixins from '../../mixins/label.js'

function push (child, h, name, slot, replace, conf) {
  const defaultProps = { props: { right: conf.right } }

  if (slot && replace) {
    child.push(h(name, defaultProps, slot))
    return
  }

  let v = false
  for (let p in conf) {
    if (conf.hasOwnProperty(p)) {
      v = conf[p]
      if (v !== void 0 && v !== true) {
        child.push(h(name, { props: conf }))
        break
      }
    }
  }

  slot && child.push(h(name, defaultProps, slot))
}

export default {
  name: 'QItemWrapper',
  mixins: [LabelMixins],
  props: {
    cfg: {
      type: Object,
      default: () => ({})
    },
    slotReplace: Boolean
  },
  render (h) {
    const
      cfg = this.cfg,
      replace = this.slotReplace,
      child = []
      this.$slots.before &&
       child.push(h('div', {staticClass: 'q-item-before q-mr-sm'}, this.$slots.before))
    push(child, h, QItemSide, this.$slots.left, replace, {
      icon: cfg.icon,
      color: cfg.leftColor,
      avatar: cfg.avatar,
      letter: this.getLabelValue(cfg.letter),
      image: cfg.image,
      inverted: cfg.leftInverted,
      textColor: cfg.leftTextColor,
      defaultImage: cfg.defaultImage
    })

    push(child, h, QItemMain, this.$slots.main, replace, {
      label: this.getLabelValue(cfg.label),
      sublabel: this.getLabelValue(cfg.sublabel),
      labelLines: cfg.labelLines,
      sublabelLines: cfg.sublabelLines,
      inset: cfg.inset
    })

    push(child, h, QItemSide, this.$slots.right, replace, {
      right: true,
      icon: cfg.rightIcon,
      color: cfg.rightColor,
      avatar: cfg.rightAvatar,
      letter: this.getLabelValue(cfg.rightLetter),
      image: cfg.rightImage,
      stamp: this.getLabelValue(cfg.stamp),
      inverted: cfg.rightInverted,
      textColor: cfg.rightTextColor,
      defaultImage: cfg.rightDefaultImage
    })

    child.push(this.$slots.default)

    this.$slots.after &&
      child.push(h('div', {staticClass: 'q-item-after q-ml-sm'}, this.$slots.after))

    return h(QItem, {
      attrs: this.$attrs,
      on: this.$listeners,
      staticClass: cfg.className,
      props: cfg
    }, child)
  }
}
