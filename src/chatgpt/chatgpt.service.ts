import { Injectable } from '@nestjs/common';
import { Configuration, CreateChatCompletionRequest, OpenAIApi } from 'openai';

@Injectable()
export class ChatgptService {
  private readonly configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  private readonly openai = new OpenAIApi(this.configuration);

  constructor() {}

  async callChatGpt(prompt: string) {
    try {
      const queryObj: CreateChatCompletionRequest = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
        temperature: 1,
      };

      const completion = await this.openai.createChatCompletion(queryObj);
      const message = completion.data.choices[0].message;
      const usage = completion.data.usage;

      return { message, usage };
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }
}