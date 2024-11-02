import { applicationConfig, componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular';

import { provideHttpClient } from '@angular/common/http';
import { RegisterPage } from './register-page';

const meta: Meta<RegisterPage> = {
  title: 'Pages/RegisterPage',
  component: RegisterPage,
  decorators: [
    componentWrapperDecorator((story) => `<div style="width: 100%; height: 100vh">${story}</div>`),
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<RegisterPage>;

export const _RegisterPage: Story = {};
