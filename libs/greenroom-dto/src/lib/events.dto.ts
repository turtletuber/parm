import { 
  IsNotEmpty,
  IsNumber,
  Min,
  IsString,
  Equals,
  ValidateNested,
  ValidateIf
} from 'class-validator';
import { Type } from 'class-transformer';
import { Comic, Slot, Event } from '@parm/greenroom-interface';

export class ComicDto implements Comic {
  @Equals(Comic)
  @IsString()
  _type: 'comic';

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNumber()
  @Min(0)
  @ValidateIf(o => o.order !== null)
  order: number | null;
}

export class SlotDto implements Slot {
  @Equals(Slot)
  @IsString()
  _type: 'slot';

  @ValidateNested({ each: true })
  @Type(() => ComicDto) 
  comics: ComicDto[];

  @IsNumber()
  @Min(0)
  order: number;
}

export class EventDto implements Event {
  @Equals(Event)
  @IsString()
  _type: 'event';

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  place: string;

  @ValidateNested({ each: true })
  @Type(() => SlotDto) 
  slots: Slot[];
}