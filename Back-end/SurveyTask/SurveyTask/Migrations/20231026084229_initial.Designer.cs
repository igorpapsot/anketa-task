﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using SurveyTask.Data;

#nullable disable

namespace SurveyTask.Migrations
{
    [DbContext(typeof(SurveyDbContext))]
    [Migration("20231026084229_initial")]
    partial class initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("SurveyTask.Models.AnswerClass.Answer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<int>("Order")
                        .HasColumnType("integer");

                    b.Property<int>("QuestionId")
                        .HasColumnType("integer");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.Property<int>("Value")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.ToTable("Answers");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "1",
                            Order = 1,
                            QuestionId = 1,
                            Type = 1,
                            Value = 1
                        },
                        new
                        {
                            Id = 2,
                            Description = "2",
                            Order = 2,
                            QuestionId = 1,
                            Type = 1,
                            Value = 2
                        },
                        new
                        {
                            Id = 3,
                            Description = "3",
                            Order = 3,
                            QuestionId = 1,
                            Type = 1,
                            Value = 3
                        },
                        new
                        {
                            Id = 4,
                            Description = "Too slow",
                            Order = 1,
                            QuestionId = 2,
                            Type = 1,
                            Value = 1
                        },
                        new
                        {
                            Id = 5,
                            Description = "Just right",
                            Order = 2,
                            QuestionId = 2,
                            Type = 1,
                            Value = 2
                        },
                        new
                        {
                            Id = 6,
                            Description = "Too fast",
                            Order = 3,
                            QuestionId = 2,
                            Type = 1,
                            Value = 3
                        },
                        new
                        {
                            Id = 7,
                            Description = "1",
                            Order = 1,
                            QuestionId = 3,
                            Type = 1,
                            Value = 1
                        },
                        new
                        {
                            Id = 8,
                            Description = "2",
                            Order = 2,
                            QuestionId = 3,
                            Type = 1,
                            Value = 2
                        },
                        new
                        {
                            Id = 9,
                            Description = "3",
                            Order = 3,
                            QuestionId = 3,
                            Type = 1,
                            Value = 3
                        },
                        new
                        {
                            Id = 10,
                            Order = 4,
                            QuestionId = 4,
                            Type = 0,
                            Value = 0
                        });
                });

            modelBuilder.Entity("SurveyTask.Models.AnsweredQuestionClass.AnsweredQuestion", b =>
                {
                    b.Property<int>("SubmissionId")
                        .HasColumnType("integer");

                    b.Property<int>("AnswerId")
                        .HasColumnType("integer");

                    b.Property<string>("Text")
                        .HasColumnType("text");

                    b.HasKey("SubmissionId", "AnswerId");

                    b.HasIndex("AnswerId");

                    b.ToTable("AnsweredQuestions");
                });

            modelBuilder.Entity("SurveyTask.Models.ClientClass.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Clients");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Idea"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Univer"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Lidl"
                        });
                });

            modelBuilder.Entity("SurveyTask.Models.ProjectClass.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("ClientId")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Projects");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ClientId = 1,
                            Name = "Project 1"
                        },
                        new
                        {
                            Id = 2,
                            ClientId = 1,
                            Name = "Project 2"
                        },
                        new
                        {
                            Id = 3,
                            ClientId = 2,
                            Name = "Project 3"
                        },
                        new
                        {
                            Id = 4,
                            ClientId = 3,
                            Name = "Project 4"
                        },
                        new
                        {
                            Id = 5,
                            ClientId = 3,
                            Name = "Project 5"
                        });
                });

            modelBuilder.Entity("SurveyTask.Models.QuestionClass.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Index")
                        .HasColumnType("integer");

                    b.Property<int>("Order")
                        .HasColumnType("integer");

                    b.Property<bool>("Required")
                        .HasColumnType("boolean");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Questions");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "How aligned is the project with the initial scope?",
                            Index = 1,
                            Order = 1,
                            Required = true,
                            Type = 1
                        },
                        new
                        {
                            Id = 2,
                            Description = "How would you rate the current pace of the project?",
                            Index = 2,
                            Order = 2,
                            Required = true,
                            Type = 1
                        },
                        new
                        {
                            Id = 3,
                            Description = "How effective is the current team collaboration?",
                            Index = 3,
                            Order = 3,
                            Required = true,
                            Type = 1
                        },
                        new
                        {
                            Id = 4,
                            Description = "Would you like to add something?",
                            Index = 4,
                            Order = 4,
                            Required = false,
                            Type = 0
                        });
                });

            modelBuilder.Entity("SurveyTask.Models.SubmissionClass.Submission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<double>("OriginalScore")
                        .HasColumnType("double precision");

                    b.Property<int>("ProjectId")
                        .HasColumnType("integer");

                    b.Property<int>("WeightVersionId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.HasIndex("WeightVersionId");

                    b.ToTable("Submissions");
                });

            modelBuilder.Entity("SurveyTask.Models.WeightClass.Weight", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Index")
                        .HasColumnType("integer");

                    b.Property<int>("Value")
                        .HasColumnType("integer");

                    b.Property<int>("WeightVersionId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("WeightVersionId");

                    b.ToTable("Weights");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Index = 1,
                            Value = 1,
                            WeightVersionId = 3
                        },
                        new
                        {
                            Id = 2,
                            Index = 2,
                            Value = 2,
                            WeightVersionId = 3
                        },
                        new
                        {
                            Id = 3,
                            Index = 3,
                            Value = 3,
                            WeightVersionId = 3
                        },
                        new
                        {
                            Id = 4,
                            Index = 4,
                            Value = 0,
                            WeightVersionId = 3
                        },
                        new
                        {
                            Id = 5,
                            Index = 1,
                            Value = 2,
                            WeightVersionId = 1
                        },
                        new
                        {
                            Id = 6,
                            Index = 2,
                            Value = 2,
                            WeightVersionId = 1
                        },
                        new
                        {
                            Id = 7,
                            Index = 3,
                            Value = 2,
                            WeightVersionId = 1
                        },
                        new
                        {
                            Id = 8,
                            Index = 4,
                            Value = 0,
                            WeightVersionId = 1
                        },
                        new
                        {
                            Id = 9,
                            Index = 1,
                            Value = 2,
                            WeightVersionId = 2
                        },
                        new
                        {
                            Id = 10,
                            Index = 2,
                            Value = 2,
                            WeightVersionId = 2
                        },
                        new
                        {
                            Id = 11,
                            Index = 3,
                            Value = 1,
                            WeightVersionId = 2
                        },
                        new
                        {
                            Id = 12,
                            Index = 4,
                            Value = 0,
                            WeightVersionId = 2
                        });
                });

            modelBuilder.Entity("SurveyTask.Models.WeightVersionClass.WeightVersion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("VersionName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("VersionNumber")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("WeightVersions");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            VersionName = "1st version",
                            VersionNumber = 1
                        },
                        new
                        {
                            Id = 2,
                            VersionName = "2nd version",
                            VersionNumber = 2
                        },
                        new
                        {
                            Id = 3,
                            VersionName = "3rd version",
                            VersionNumber = 3
                        });
                });

            modelBuilder.Entity("SurveyTask.Models.AnswerClass.Answer", b =>
                {
                    b.HasOne("SurveyTask.Models.QuestionClass.Question", "Question")
                        .WithMany("Answers")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Question");
                });

            modelBuilder.Entity("SurveyTask.Models.AnsweredQuestionClass.AnsweredQuestion", b =>
                {
                    b.HasOne("SurveyTask.Models.AnswerClass.Answer", "Answer")
                        .WithMany("AnsweredQuestions")
                        .HasForeignKey("AnswerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SurveyTask.Models.SubmissionClass.Submission", "Submission")
                        .WithMany("AnsweredQuestions")
                        .HasForeignKey("SubmissionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Answer");

                    b.Navigation("Submission");
                });

            modelBuilder.Entity("SurveyTask.Models.SubmissionClass.Submission", b =>
                {
                    b.HasOne("SurveyTask.Models.ProjectClass.Project", "Project")
                        .WithMany("Submissions")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SurveyTask.Models.WeightVersionClass.WeightVersion", "WeightVersion")
                        .WithMany("Submissions")
                        .HasForeignKey("WeightVersionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");

                    b.Navigation("WeightVersion");
                });

            modelBuilder.Entity("SurveyTask.Models.WeightClass.Weight", b =>
                {
                    b.HasOne("SurveyTask.Models.WeightVersionClass.WeightVersion", "WeightVersion")
                        .WithMany("Weights")
                        .HasForeignKey("WeightVersionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("WeightVersion");
                });

            modelBuilder.Entity("SurveyTask.Models.AnswerClass.Answer", b =>
                {
                    b.Navigation("AnsweredQuestions");
                });

            modelBuilder.Entity("SurveyTask.Models.ProjectClass.Project", b =>
                {
                    b.Navigation("Submissions");
                });

            modelBuilder.Entity("SurveyTask.Models.QuestionClass.Question", b =>
                {
                    b.Navigation("Answers");
                });

            modelBuilder.Entity("SurveyTask.Models.SubmissionClass.Submission", b =>
                {
                    b.Navigation("AnsweredQuestions");
                });

            modelBuilder.Entity("SurveyTask.Models.WeightVersionClass.WeightVersion", b =>
                {
                    b.Navigation("Submissions");

                    b.Navigation("Weights");
                });
#pragma warning restore 612, 618
        }
    }
}