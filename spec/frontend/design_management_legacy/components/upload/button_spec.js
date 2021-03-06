import { shallowMount } from '@vue/test-utils';
import UploadButton from '~/design_management_legacy/components/upload/button.vue';

describe('Design management upload button component', () => {
  let wrapper;

  function createComponent(isSaving = false, isInverted = false) {
    wrapper = shallowMount(UploadButton, {
      propsData: {
        isSaving,
        isInverted,
      },
    });
  }

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders upload design button', () => {
    createComponent();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders inverted upload design button', () => {
    createComponent(false, true);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders loading icon', () => {
    createComponent(true);

    expect(wrapper.element).toMatchSnapshot();
  });

  describe('onFileUploadChange', () => {
    it('emits upload event', () => {
      createComponent();

      wrapper.vm.onFileUploadChange({ target: { files: 'test' } });

      expect(wrapper.emitted().upload[0]).toEqual(['test']);
    });
  });

  describe('openFileUpload', () => {
    it('triggers click on input', () => {
      createComponent();

      const clickSpy = jest.spyOn(wrapper.find('input').element, 'click');

      wrapper.vm.openFileUpload();

      expect(clickSpy).toHaveBeenCalled();
    });
  });
});
