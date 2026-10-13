import test from 'node:test';
import assert from 'node:assert/strict';
import {buildCalendar} from '../public/calendar-export.js';
test('calendar export creates repeating local-time activities and advance reminders',()=>{
 const result=buildCalendar([{id:'evt-1',title:'Evening cycling',time:'17:30',days:[1,3,5],minutes:30,enabled:true}],new Date('2026-10-13T10:00:00'));
 assert.match(result,/BEGIN:VCALENDAR/);
 assert.match(result,/SUMMARY:Evening cycling/);
 assert.match(result,/RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR/);
 assert.match(result,/TRIGGER:-PT10M/);
 assert.match(result,/DTSTART:20261014T173000/);
});
test('calendar export avoids injection and skips disabled schedules',()=>{
 const value=buildCalendar([{id:'safe',title:'Paint\nBEGIN:VEVENT',time:'18:00',days:[2],minutes:15,enabled:true},{id:'no',title:'Disabled',time:'19:00',days:[2],minutes:20,enabled:false}],new Date('2026-10-13T10:00:00'));
 assert.ok(!value.includes('SUMMARY:Paint\nBEGIN:VEVENT'));
 assert.ok(!value.includes('SUMMARY:Disabled'));
 assert.equal((value.match(/(?:^|\r\n)BEGIN:VEVENT(?:\r\n|$)/g)||[]).length,1);
});
