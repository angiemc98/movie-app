import { User } from "src/users/user.entity";
import { CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm";
import { PrimaryGeneratedColumn, Column, JoinColumn} from "typeorm";




@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()  
  id: number;

  @Column()
  imdbID: string

  @Column()
  title: string;

 @Column()
  year: string;

  @Column()
  type: string;

  @Column({nullable: true})
  genre: string;

  @Column({nullable: true})
  director: string;

  @Column({ type: 'text' })
   actors: string;

  @Column({nullable: true})
  plot: string;

  @Column({nullable: true})
  poster: string;

  @Column({nullable: true})
  runtime: string;

  @Column({nullable: true})
  rating: number;
  //relationships
   @ManyToOne(() => User, (user) => user.favoriteMovies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number; // Foreign key to User entity

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn ()
  updatedAt: Date;
}
