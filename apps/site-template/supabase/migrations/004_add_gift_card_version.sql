-- Migration: 004_add_gift_card_version.sql
-- Adds optimistic locking version column to gift_cards table

ALTER TABLE gift_cards ADD COLUMN IF NOT EXISTS version INTEGER NOT NULL DEFAULT 0;