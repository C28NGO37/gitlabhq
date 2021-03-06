<script>
import {
  GlButton,
  GlSprintf,
  GlLink,
  GlIcon,
  GlFormGroup,
  GlFormCheckbox,
  GlNewDropdown,
  GlNewDropdownItem,
} from '@gitlab/ui';
import {
  I18N_ALERT_SETTINGS_FORM,
  NO_ISSUE_TEMPLATE_SELECTED,
  TAKING_INCIDENT_ACTION_DOCS_LINK,
  ISSUE_TEMPLATES_DOCS_LINK,
} from '../constants';

export default {
  components: {
    GlButton,
    GlSprintf,
    GlLink,
    GlFormGroup,
    GlIcon,
    GlFormCheckbox,
    GlNewDropdown,
    GlNewDropdownItem,
  },
  inject: ['service', 'alertSettings'],
  data() {
    return {
      templates: [NO_ISSUE_TEMPLATE_SELECTED, ...this.alertSettings.templates],
      createIssueEnabled: this.alertSettings.createIssue,
      issueTemplate: this.alertSettings.issueTemplateKey,
      sendEmailEnabled: this.alertSettings.sendEmail,
      loading: false,
    };
  },
  i18n: I18N_ALERT_SETTINGS_FORM,
  TAKING_INCIDENT_ACTION_DOCS_LINK,
  ISSUE_TEMPLATES_DOCS_LINK,
  computed: {
    issueTemplateHeader() {
      return this.issueTemplate || NO_ISSUE_TEMPLATE_SELECTED.name;
    },
    formData() {
      return {
        create_issue: this.createIssueEnabled,
        issue_template_key: this.issueTemplate,
        send_email: this.sendEmailEnabled,
      };
    },
  },
  methods: {
    selectIssueTemplate(templateKey) {
      this.issueTemplate = templateKey;
    },
    isTemplateSelected(templateKey) {
      return templateKey === this.issueTemplate;
    },
    updateAlertsIntegrationSettings() {
      this.loading = true;

      this.service.updateSettings(this.formData).catch(() => {
        this.loading = false;
      });
    },
  },
};
</script>

<template>
  <div>
    <p>
      <gl-sprintf :message="$options.i18n.introText">
        <template #docsLink>
          <gl-link :href="$options.TAKING_INCIDENT_ACTION_DOCS_LINK" target="_blank">
            <span>{{ $options.i18n.introLinkText }}</span>
          </gl-link>
        </template>
      </gl-sprintf>
    </p>
    <form ref="settingsForm" @submit.prevent="updateAlertsIntegrationSettings">
      <gl-form-group class="gl-pl-0">
        <gl-form-checkbox v-model="createIssueEnabled" data-qa-selector="create_issue_checkbox">
          <span>{{ $options.i18n.createIssue.label }}</span>
        </gl-form-checkbox>
      </gl-form-group>

      <gl-form-group
        label-size="sm"
        label-for="alert-integration-settings-issue-template"
        class="col-8 col-md-9 gl-px-6"
      >
        <label class="gl-display-inline-flex" for="alert-integration-settings-issue-template">
          {{ $options.i18n.issueTemplate.label }}
          <gl-link :href="$options.ISSUE_TEMPLATES_DOCS_LINK" target="_blank">
            <gl-icon name="question" :size="12" />
          </gl-link>
        </label>
        <gl-new-dropdown
          id="alert-integration-settings-issue-template"
          data-qa-selector="incident_templates_dropdown"
          :text="issueTemplateHeader"
          :block="true"
        >
          <gl-new-dropdown-item
            v-for="template in templates"
            :key="template.key"
            data-qa-selector="incident_templates_item"
            :is-check-item="true"
            :is-checked="isTemplateSelected(template.key)"
            @click="selectIssueTemplate(template.key)"
          >
            {{ template.name }}
          </gl-new-dropdown-item>
        </gl-new-dropdown>
      </gl-form-group>

      <gl-form-group class="gl-pl-0 gl-mb-5">
        <gl-form-checkbox v-model="sendEmailEnabled">
          <span>{{ $options.i18n.sendEmail.label }}</span>
        </gl-form-checkbox>
      </gl-form-group>
      <div class="gl-display-flex gl-justify-content-end">
        <gl-button
          ref="submitBtn"
          data-qa-selector="save_changes_button"
          :disabled="loading"
          variant="success"
          type="submit"
          class="js-no-auto-disable"
        >
          {{ $options.i18n.saveBtnLabel }}
        </gl-button>
      </div>
    </form>
  </div>
</template>
