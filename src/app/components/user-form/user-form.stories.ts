import { applicationConfig, componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular';

import { UserFormComponent } from './user-form.component';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<UserFormComponent> = {
  title: 'Components/UserForm',
  component: UserFormComponent,
  decorators: [
    componentWrapperDecorator((story) => `<div style="width: 100%; height: 100vh; padding: 3rem">${story}</div>`),
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['login', 'register']
    }
  },
};

export default meta;
type Story = StoryObj<UserFormComponent>;

export const LoginForm: Story = {};
LoginForm.args = {
  variant: 'login'
}

export const RegisterForm: Story = {};
RegisterForm.args = {
  variant: 'register'
}
