import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, BeforeInsert } from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from '../../posts/entities/post.entity';
import * as bcrypt from 'bcrypt';

@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 255,
        select: false
    })
    password: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at'
    })
    updatedAt: Date;

    @OneToOne(() => Profile, {
        nullable: false,
        cascade: true
    })
    @JoinColumn({
        name: 'profile_id'
    })
    profile: Profile;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}