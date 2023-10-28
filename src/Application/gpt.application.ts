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
          {"role": "system", "content": 'あなたはユーザーから送られてくる今後の予定が書かれている情報から、まず情報を整理して、誤字脱字を確かめ、修正します。その後、「タイトル、場所、日付、開始時間、終了時間、URL、タイプ」の各項目を抽出して、無い項目は空文字で、キーが順番に、"title","place","date","start_time","end_time","url","type"のJSON形式のみで返答します。タイトルには会社名などの固有名詞がある場合は必ずそれも入れてください。日付は10月1日なら10-01といったMM-DDのフォーマットでお願いします。時間は12時30分なら12:30といったhh-mmのフォーマットでお願いします。タイプにはユーザーから送られてきた情報が時間の幅を持った予定なのか、いつまでに何をしなければならないというタスクなのか判別し、予定なら"plan"、タスクなら"task"を入れてください。判別不能な場合planを入れてください。また、もし、ユーザーからの送信に二つ以上の予定が入っている場合一つ目のみ抜き出してください。'},
          {"role": "user", "content": ocrText}
        ],
      });
  
      return response.choices[0].message.content;

    }catch(e){
      return e
    }

  }

}

export { GptApplication }