<script>
import { __, sprintf } from '~/locale';
import icon from '~/vue_shared/components/icon.vue';
import tooltip from '~/vue_shared/directives/tooltip';

export default {
  name: 'TimeTrackingCollapsedState',
  components: {
    icon,
  },
  directives: {
    tooltip,
  },
  props: {
    showComparisonState: {
      type: Boolean,
      required: true,
    },
    showSpentOnlyState: {
      type: Boolean,
      required: true,
    },
    showEstimateOnlyState: {
      type: Boolean,
      required: true,
    },
    showNoTimeTrackingState: {
      type: Boolean,
      required: true,
    },
    timeSpentHumanReadable: {
      type: String,
      required: false,
      default: '',
    },
    timeEstimateHumanReadable: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    divClass() {
      if (this.showComparisonState) {
        return 'compare';
      } else if (this.showEstimateOnlyState) {
        return 'estimate-only';
      } else if (this.showSpentOnlyState) {
        return 'spend-only';
      } else if (this.showNoTimeTrackingState) {
        return 'no-tracking';
      }

      return '';
    },
    spanClass() {
      if (this.showComparisonState) {
        return '';
      } else if (this.showEstimateOnlyState || this.showSpentOnlyState) {
        return 'bold';
      } else if (this.showNoTimeTrackingState) {
        return 'no-value';
      }

      return '';
    },
    text() {
      if (this.showComparisonState) {
        return `${this.timeSpentHumanReadable} / ${this.timeEstimateHumanReadable}`;
      } else if (this.showEstimateOnlyState) {
        return `-- / ${this.timeEstimateHumanReadable}`;
      } else if (this.showSpentOnlyState) {
        return `${this.timeSpentHumanReadable} / --`;
      } else if (this.showNoTimeTrackingState) {
        return __('None');
      }

      return '';
    },
    timeTrackedTooltipText() {
      let title;
      if (this.showComparisonState) {
        title = __('Time remaining');
      } else if (this.showEstimateOnlyState) {
        title = __('Estimated');
      } else if (this.showSpentOnlyState) {
        title = __('Time spent');
      }

      return sprintf('%{title}: %{text}', { title, text: this.text });
    },
    tooltipText() {
      return this.showNoTimeTrackingState ? __('Time tracking') : this.timeTrackedTooltipText;
    },
  },
};
</script>

<template>
  <div
    v-tooltip
    :title="tooltipText"
    class="sidebar-collapsed-icon"
    data-container="body"
    data-placement="left"
    data-boundary="viewport"
  >
    <icon name="timer" />
    <div class="time-tracking-collapsed-summary">
      <div :class="divClass">
        <span :class="spanClass"> {{ text }} </span>
      </div>
    </div>
  </div>
</template>
