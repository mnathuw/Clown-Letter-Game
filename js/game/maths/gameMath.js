import randomize from '../../framework/utils/randomize.js';

export default class GameMath
{
  constructor()
  {

  }

  generateNewGame(user_hash, game_id, callback)
  {
    //todo: generateNewGame from external API.
    //will need to push game_id, user_id, hash, level, prevCalc.
    //dont pass the score has a param, the score should be added each time to the database
    var url = "https://edu.creonix.xyz/api/game/generate";
    var data = {
      hash: user_hash,
      game_id: game_id
    };
    $.get(
    {
      url: url,
      data: data,
      dataType: 'json',
      success: function(data,status,xhr)
      {
        callback(data);
      }
    });
  }
}
