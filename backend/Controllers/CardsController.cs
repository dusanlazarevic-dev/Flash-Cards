using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CardsController : ControllerBase
    {
        public CardsContext Context { get; set; }
        public CardsController(CardsContext context)
        {
            Context = context;

        }

        [Route("GetTopic")]
        [HttpGet]

        public async Task<List<LearningTopic>> GetTopics()
        {
            return await Context.Topics.Include(p => p.Cards).ToListAsync();
        }

        [Route("WriteTopic")]
        [HttpPost]

        public async Task<IActionResult> WriteTopic([FromBody] LearningTopic topic)
        {
            if (String.IsNullOrEmpty(topic.TopicName))
            {
                return StatusCode(406);
            }
            else
            {

                Context.Topics.Add(topic);
                await Context.SaveChangesAsync();
                return Ok();

            }
        }

        [Route("ModifyTopic")]
        [HttpPut]


        public async Task<IActionResult> ModifyTopic(string oldName, string newName)
        {
            if (String.IsNullOrEmpty(oldName) || String.IsNullOrEmpty(newName))
            {
                return StatusCode(406);
            }
            else
            {
                var topicFromContext = Context.Topics.First(t => t.TopicName == oldName);
                topicFromContext.TopicName = newName;
                await Context.SaveChangesAsync();
                return Ok();
            }
        }

        [Route("DeleteTopic/{topicName}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteTopic(string topicName)
        {
            if (String.IsNullOrEmpty(topicName))
            {
                return StatusCode(406);
            }
            else
            {
                var topicFromContext = Context.Topics.First(t => t.TopicName == topicName);

                var cardsFromContext = (from f in Context.FlashCards
                                        where f.Topic == topicFromContext
                                        select f).ToList();
                cardsFromContext.ForEach(c =>
                {
                    Context.Remove(c);
                });

                Context.Remove(topicFromContext);
                await Context.SaveChangesAsync();
                return Ok();
            }
        }

        /////////////cards 

        [Route("WriteCard/{topicName}")]
        [HttpPost]
        public async Task<IActionResult> WriteCard(string topicName, [FromBody] FlashCard card)
        {
            if (String.IsNullOrEmpty(topicName) || String.IsNullOrEmpty(card.Question) || String.IsNullOrEmpty(card.Answer))
            {
                return StatusCode(406);
            }
            else
            {

                var topic = Context.Topics.First(t => t.TopicName == topicName);
                card.Topic = topic;
                Context.FlashCards.Add(card);
                await Context.SaveChangesAsync();
                return Ok();
            }

        }


        [Route("ModifyCard/{topicName}")]
        [HttpPut]

        public async Task<IActionResult> ModifyCard(string topicName, [FromBody] FlashCard card)
        {
            if (String.IsNullOrEmpty(topicName) || String.IsNullOrEmpty(card.Question) || String.IsNullOrEmpty(card.Answer))
            {
                return StatusCode(406);
            }
            else
            {
                var oldCard = Context.FlashCards.First(f => (f.Topic.TopicName == topicName) && (f.Question == card.Question));
                oldCard.Question = card.Question;
                oldCard.Answer = card.Answer;
                await Context.SaveChangesAsync();
                return Ok();
            }
        }


        [Route("DeleteCard/{topicName}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteCard(string topicName, [FromBody] FlashCard card)
        {

            if (String.IsNullOrEmpty(topicName) || String.IsNullOrEmpty(card.Question) || String.IsNullOrEmpty(card.Answer))
            {
                return StatusCode(406);
            }
            else
            {
                var cardFromContext = Context.FlashCards.First(f => (f.Topic.TopicName == topicName) && (f.Question == card.Question));
                Context.Remove(cardFromContext);
                await Context.SaveChangesAsync();
                return Ok();
            }
        }
    }
}