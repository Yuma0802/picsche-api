import { Injectable } from '@nestjs/common'
import { OpenAI } from 'openai';

@Injectable()
class GptApplication{
  private readonly apiKey = process.env.OPENAI_API_KEY;
  private readonly openai = new OpenAI({ apiKey: this.apiKey });

  async extractInfo(ocrText:string) {
    try{
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": "あなたはユーザーから送られてくる今後の予定が書かれている情報から、まず情報を整理して、誤字脱字を確かめ修正した後に、タイトル、場所、日付、開始時間、終了時間、URLを抽出して、無い項目は空欄で、特にタイトルは気をつけて適切な言葉にするように。時間に関しても正確に返答します。"},
          {"role": "user", "content": ocrText}
        ],
      });
  
      return response.choices[0].message;

    }catch(e){
      return e
    }

  }

}

export { GptApplication }