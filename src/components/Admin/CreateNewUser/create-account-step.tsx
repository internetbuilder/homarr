import { Button, Card, Flex, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconArrowRight, IconAt, IconUser } from '@tabler/icons-react';
import { z } from 'zod';

interface CreateAccountStepProps {
  nextStep: ({ eMail, username }: { username: string; eMail: string }) => void;
}

export const CreateAccountStep = ({ nextStep }: CreateAccountStepProps) => {
  const form = useForm({
    initialValues: {
      username: '',
      eMail: '',
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: zodResolver(createAccountStepValidationSchema),
  });

  return (
    <Card mih={400}>
      <TextInput
        icon={<IconUser size="0.8rem" />}
        label="Username"
        variant="filled"
        mb="md"
        withAsterisk
        {...form.getInputProps('username')}
      />
      <TextInput
        icon={<IconAt size="0.8rem" />}
        label="E-Mail"
        variant="filled"
        mb="md"
        {...form.getInputProps('eMail')}
      />

      <Flex justify="end" wrap="nowrap">
        <Button
          rightIcon={<IconArrowRight size="1rem" />}
          disabled={!form.isValid()}
          onClick={() => {
            nextStep({
              username: form.values.username,
              eMail: form.values.eMail,
            });
          }}
          variant="light"
          px="xl"
        >
          Next
        </Button>
      </Flex>
    </Card>
  );
};

export const createAccountStepValidationSchema = z.object({
  username: z.string().min(1).max(100),
  eMail: z.string().email().or(z.literal('')),
});
